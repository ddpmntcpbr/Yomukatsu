export const CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION";
export const closeNotificationAction = () => {
  return {
    type: "CLOSE_NOTIFICATION",
    payload: {
      isOpen: false,
      variant: "success",
      message: "",
    },
  };
};

export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const setNotificationAction = (variant, message) => {
  return {
    type: "SET_NOTIFICATION",
    payload: {
      isOpen: true,
      variant: variant,
      message: message,
    },
  };
};
