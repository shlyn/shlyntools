import type { UserInfo, QuestionItem, AnswerItem, ReportResult } from "@/types"

// 报告结果
export const UserInfoStored = {
  key: "sd_user_info",
  get value(): UserInfo {
    const val = window.localStorage.getItem(this.key);
    return val && JSON.parse(val);
  },
  set value(val: UserInfo) {
    const res = JSON.stringify(val || {});
    window.localStorage.setItem(this.key, res);
  },
  clear() {
    window.localStorage.removeItem(this.key);
  },
};

// 题目列表
export const QuestionListStored = {
  key: "sd_question_list",
  get value(): QuestionItem[] {
    const val = window.localStorage.getItem(this.key);
    return val ? JSON.parse(val) : [];
  },
  set value(val: QuestionItem[]) {
    if (Array.isArray(val)) {
      val.sort((a,b) => a.question_id - b.question_id)
      const res = JSON.stringify(val);
      window.localStorage.setItem(this.key, res);
    }
  },
  clear() {
    window.localStorage.removeItem(this.key);
  },
};

// 答案列表
export const AnswerListStored = {
  key: "sd_answer_list",
  get value(): AnswerItem[] {
    const val = window.localStorage.getItem(this.key);
    return val ? JSON.parse(val) : [];
  },
  set value(val: AnswerItem[]) {
    const res = JSON.stringify(val || []);
    window.localStorage.setItem(this.key, res);
  },
  clear() {
    window.localStorage.removeItem(this.key);
  },
  addItem(answerItem: AnswerItem) {
    const value = window.localStorage.getItem(this.key);
    if (value) {
      const list = JSON.parse(value);
      const index = list.findIndex((item: AnswerItem) => item.question_id === answerItem.question_id);
      if (~index) {
        list.splice(index, 1, answerItem);
        window.localStorage.setItem(this.key, JSON.stringify(list));
      } else {
        list.push(answerItem);
        window.localStorage.setItem(this.key, JSON.stringify(list));
      }
    } else {
        window.localStorage.setItem(this.key, JSON.stringify([answerItem]));
    }
  },
  removeItem(answerItem: AnswerItem) {
    const value = window.localStorage.getItem(this.key);
    if (value) {
      const list = JSON.parse(value);
      const index = list.findIndex((item: AnswerItem) => item.question_id === answerItem.question_id);
      if (~index) {
        list.splice(index, 1);
        window.localStorage.setItem(this.key, JSON.stringify(list));
      }
    }
  }
};

// 报告结果
export const ReportResultStored = {
  key: "sd_report_result",
  get value(): ReportResult {
    const val = window.localStorage.getItem(this.key);
    return val && JSON.parse(val);
  },
  set value(val: ReportResult) {
    const res = JSON.stringify(val || {});
    window.localStorage.setItem(this.key, res);
  },
  clear() {
    window.localStorage.removeItem(this.key);
  },
};

// export const UserInfoStored = {
//   key: "sd_user_info",
//   get value() {
//     return window.localStorage.getItem(this.key) || "";
//   },
//   set value(val: string) {
//     window.localStorage.setItem(this.key, val);
//   },
//   clear() {
//     window.localStorage.removeItem(this.key);
//   },
// };
