export default class TodoItem {
  constructor(name, content) {
    if (name === undefined || name.length === 0) {
      throw new Error('The title is missing');
    }
    if (content === undefined || content.length === 0) {
      throw new Error('The description is missing');
    }
    if (content.length > 1000) {
      throw new Error('The description length must be under 1000 characters');
    }
    this.name = name;
    this.content = content;
    this.date = new Date();
  }
}
