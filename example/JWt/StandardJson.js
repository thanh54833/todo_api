class StandardJson {
    constructor() {
        this.success = null
        this.error = null
        this.status_code = null
        this.data = null
    }
    set standardSuccess(success) {
        this.success = success
    }
    get standardSuccess() {
        return this.success
    }



    getJson() {
        console.log("status sccuess : " + this.success);
        toJson = {
            success: this.success,
            error: "error"
        }
        return JSON.stringify(toJson)
    }

}



module.exports = StandardJson
