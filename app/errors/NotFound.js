class NotFound extends Error {
  constructor() {
    super();
    this.name = 'Not found error';
  }
}

export default NotFound;
