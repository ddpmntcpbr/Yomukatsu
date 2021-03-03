export const SWITCH_TAB_INDEX = "SWITCH_TAB_INDEX";
export const switchTabIndexAction = (index) => {
    return {
        type: "SWITCH_TAB_INDEX",
        payload: {
          tabIndex: index // index = 0 or 1
        }
    }
};