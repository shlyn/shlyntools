// 
export interface UserInfo {
  userName: string;
  openId: string;
  isVip: boolean;
  loginState: boolean;
  hasRight: boolean;
  buyId: number;
}
// api ------------
export interface PostQuestionItem {
  question_id: number;
  option_id: number;
}

export interface RequestSongListParams {
  star_id: number;
  type: 1 | 2; // 1 免费歌单; 2 付费歌单
}

export interface RequestSongURLParams {
  real_song_id: string;
  openid: string; // 设备id eg: e09f7d00e9ace49e
  is_clip: 0 | 1; // 0 非片段；1 片段
}

// 歌曲对象
export interface SongPropsItem {
  real_song_id: string;
  song_name: string;
  singer: string;
  cover_url: string;
  is_vip: boolean;
}

// storage data
export interface OptionItem {
  option: string;
  option_id: number;
  real_song_id: string;
}

export interface QuestionItem {
  question_id: number;
  barrage_list: string[];
  title: string;
  option_list: OptionItem[];
  need_play: 0 | 1;
}

export interface AnswerItem {
  question_id: number;
  option_id: number;
}
export interface ReportResult {
  character_set: string;
  star_id: number;
  star_img: string;
  star_name: string;
}
