import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AddRemind from "../components/AddRemind";
import RemindersList from "../components/RemindersList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import moment from "moment-timezone";

const ToDo = () => {
  const [reminders, setReminders] = useState([]);

  const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
  const API_KEY = Constants.expoConfig.extra.oneSignalApiKey;

  const sortReminders = (reminders) => reminders.sort((a, b) => a.date - b.date);

  const saveReminders = async (updatedReminders) => {
    setReminders(updatedReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
  };

  const handleAddReminder = async (reminder) => {
    const NotificationID = await sendNotification(reminder);

    if (NotificationID) {
      reminder.id = NotificationID;
      const updatedReminders = sortReminders([reminder, ...reminders]);
      await saveReminders(updatedReminders);
    } else {
      alert("Помилка при надсиланні повідомлення. Спробуйте ще раз.");
    }
  };
  const toggleReminderFinished = async (id) => {
    const updated = reminders.map((reminder) =>
      reminder.id === id
        ? { ...reminder, isFinished: !reminder.isFinished }
        : reminder
    );
    await saveReminders(updated);
  };
  const handleDeleteReminder = async (id) => {
    const reminderToDelete = reminders.find((reminder) => reminder.id === id);
    if (reminderToDelete && !reminderToDelete.isFinished) {
      try {
        await cancelNotification(reminderToDelete.id);
      } catch (error) {
        console.warn("Не вдалося скасувати повідомлення:", error);
      }
    }

    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    await saveReminders(updatedReminders);
  };

  const cancelNotification = async (notificationId) => {
    try {
      const response = await fetch(
        `https://api.onesignal.com/notifications/${notificationId}?app_id=${APP_ID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data.errors) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error canceling notification:", error);
      return false;
    }
  };

  const getCurrentUserId = async () => {
    return await AsyncStorage.getItem("externalId");
  };

  const sendNotification = async (reminder) => {
    try {
      const externalUserId = await getCurrentUserId();

      const localDate = moment(reminder.date).tz("Europe/Kiev", true).toDate();
      const response = await fetch("https://api.onesignal.com/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${API_KEY}`,
        },
        body: JSON.stringify({
          app_id: APP_ID,
          target_channel: "push",
          include_aliases: {
            external_id: [externalUserId],
          },
          headings: { en: `${reminder.name}` },
          contents: { en: `${reminder.description}` },
          send_after: localDate.toISOString(),
        }),
      });

      const data = await response.json();

      if (data.errors) {
        console.error("OneSignal error:", data.errors);
        return false;
      }

      console.log("OneSignal notification sent:", data);
      return data.id;
    } catch (error) {
      console.error("OneSignal send error:", error);
      return false;
    }
  };

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const storedReminders = await AsyncStorage.getItem("reminders");
        if (storedReminders) {
          const parsedReminders = sortReminders(JSON.parse(storedReminders));
          setReminders(parsedReminders);
        }
      } catch (error) {
        console.error("Error loading reminders:", error);
      }
    };

    loadReminders();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          To-Do Reminder
        </Text>
      </View>
      <AddRemind onAddReminder={handleAddReminder} />
      <RemindersList
        reminders={reminders}
        onDelete={handleDeleteReminder}
        onToggleFinished={toggleReminderFinished}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default ToDo;
