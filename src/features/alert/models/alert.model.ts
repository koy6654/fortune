export interface AlertMesssage {
  id?: number;
  /** Alert Message */
  message: string;
  /** 아이콘 변경을 위한 프로퍼티 */
  status: 'success' | 'fail';
}
