class ApiResponse {
    constructor(status, message = "success", data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.sucess = status < 400;
    }
}