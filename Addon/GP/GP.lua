local frame = CreateFrame("Frame")
frame:RegisterEvent("ADDON_LOADED")
frame:RegisterEvent("PLAYER_LOGOUT")
frame:RegisterEvent("GARRISON_MISSION_STARTED")

local function serialize()
  local jsonStruct = {}
  local name = UnitName("player")
  local realm = GetRealmName()
  jsonStruct["character"] = name
  jsonStruct["realm"] = realm
  jsonStruct["uuid"] = realm .. "-" .. name
  jsonStruct["missions"] = Missions
  MissionsJson = JSON.encode(jsonStruct, {indent = false})
end

frame:SetScript("OnEvent", function(self, event, arg1)
    if event == "ADDON_LOADED"and arg1 == "GP" then
      if Missions == nil then
        Missions = {}
      else
        local nowtime = time()
        local missions = {}
        for k, v in pairs(Missions) do
          if(v["endTime"] ~= nil) then
            if(difftime(nowtime, v["endTime"]) < 0) then
              print("keeping mission " .. k)
              missions[k] = v
            end
          end
        end
        Missions = missions
      end
      print("GP loaded")
    elseif event == "PLAYER_LOGOUT" then
      serialize()
    end

    if(event=="GARRISON_MISSION_STARTED") then
      local v = C_Garrison.GetBasicMissionInfo(arg1)
      local mission = {}
      mission["name"] = v["name"]
      mission["duration"] = v["duration"]
      mission["durationSeconds"] = v["durationSeconds"]
      mission["timeLeft"] = v["timeLeft"]
      mission["missionId"] = v["missionID"]
      mission["level"] = v["level"]
      mission["start"] = date()
      mission["startTime"] = time()
      mission["endTime"] = time() + v["durationSeconds"]
      Missions[v["missionID"]] = mission
      serialize()
    end

end)
