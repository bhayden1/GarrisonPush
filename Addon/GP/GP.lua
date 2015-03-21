local frame = CreateFrame("Frame")
frame:RegisterEvent("ADDON_LOADED")
frame:RegisterEvent("PLAYER_LOGOUT")

frame:SetScript("OnEvent", function(self, event, arg1)
    if event == "ADDON_LOADED"and arg1 == "GP" then
      print("hello from GP")
      if Test == nil then
          Test = 0
      else
        Test = Test + 1
      end
      print("Hello, world! Times: " .. Test)
    elseif event == "PLAYER_LOGOUT" then
      local missions = C_Garrison.GetInProgressMissions()
      local jsonStruct = {}
      local name = UnitName("player")
      local realm = GetRealmName()
      local uuid = realm .. "-" .. name
      Missions = {}
      jsonStruct["character"] = name
      jsonStruct["realm"] = realm
      jsonStruct["uuid"] = uuid

      for k, v in pairs(missions) do
        local mission = {}
        mission["name"] = v["name"]
        mission["duration"] = v["duration"]
        mission["durationSeconds"] = v["durationSeconds"]
        mission["timeLeft"] = v["timeLeft"]
        mission["missionId"] = v["missionID"]
        mission["level"] = v["level"]
        Missions[k] = mission
      end
      jsonStruct["missions"] = Missions
      MissionsJson = JSON.encode(jsonStruct, {indent = false})
    end
end)
