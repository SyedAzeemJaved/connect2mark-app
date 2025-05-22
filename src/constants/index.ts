const API_BASE_URL = 'https://safecheck-api-production.up.railway.app';
// const API_BASE_URL = 'http://192.168.100.44:8000';

export const constants = {
  TOKEN: `${API_BASE_URL}/token`,
  ME: `${API_BASE_URL}/common/me`,

  CLASSES_TODAY: `${API_BASE_URL}/academic/schedule-instances/today?page=1&size=50`,
  MARK_ATTENDANCE: `${API_BASE_URL}/academic/attendance/mark`,
  MARK_ATTENDANCE_TRACKING: `${API_BASE_URL}/academic/attendance-tracking/mark/`,

  ATTENDANCE_RESULT: `${API_BASE_URL}/academic/attendance-result`,

  RESULTS_PER_PAGE: 10,
};
