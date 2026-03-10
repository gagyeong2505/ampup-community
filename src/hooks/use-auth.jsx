const AUTH_KEY = 'ampup_user';

/**
 * 현재 로그인 사용자를 localStorage에 저장
 * @param {{ email: string, nickname: string, joinedAt: string }} user
 */
export function saveUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

/**
 * 현재 로그인 사용자 정보 로드
 * @returns {{ email: string, nickname: string, joinedAt: string } | null}
 */
export function loadUser() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * 로그아웃 - 현재 사용자 정보 삭제
 */
export function clearUser() {
  localStorage.removeItem(AUTH_KEY);
}
