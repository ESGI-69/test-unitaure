export default class TodoItem {
  constructor(name, content) {
    if (content.length > 1000) {
      throw new Error('The content length must be under 1000 characters');
    }
    this.name = name;
    this.content = content;
    this.date = new Date();
  }
}
