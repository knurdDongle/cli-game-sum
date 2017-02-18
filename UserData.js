export default class UserData {
  constructor(answer, score) {
    this.score = score;
    this.answer = answer;
  }

  getScore() {
    return this.score;
  }

  getAnswer() {
    return this.answer; // i love you
  }

  setScore(score) {
    const answer = this.answer;
    return new UserData(answer, score);
  }

  setAnswer(answer) {
    const score = this.score;
    return new UserData(answer, score);
  }
}
