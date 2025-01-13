export const LocalStorage = {
  /**
   * #### get
   * @description
   * local storage의 key를 참조하여 값을 가져온다
   * @param {string} key 참조할 key
   * @returns {T = unknown | null} 제네릭 혹은 null 타입
   */
  get: <T = unknown>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      return parsed;
    } catch (e) {
      console.error(`Failed to parse local storage key "${key}":`, e);
    }

    return null;
  },

  /**
   * #### set
   * @description
   * local storage의 key를 참조하여 값을 변경한다
   * @param {string} key 참조할 key
   * @param {object | string | number | boolean | null} item JSON 직렬화가 불가능한 타입을 제거
   */
  set: (key: string, item: object | string | number | boolean | null) => {
    localStorage.setItem(key, JSON.stringify(item));
  },

  /**
   * #### remove
   * @description
   * 제거 성공 여부를 반환하도록 하여 유용성을 높힘
   * @param {string} key 참조할 key
   * @returns {boolean} 성공/실패 여부
   */
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Failed to remove local storage key "${key}":`, e);
      return false;
    }
  },
};
