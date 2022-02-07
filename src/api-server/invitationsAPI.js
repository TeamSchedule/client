import $axios from "./axiosRequests";


export class invitationsAPI {
    static apiPrefix = "/invitations";

    static async getUnprocessedInvitations() {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async createInvitation(data) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }

    static deleteInvitation(invitationId) {
        return $axios.delete(`${this.apiPrefix}/${invitationId}`).then(res => {
            return res.data;
        }).catch(() => null);
    }

    static async acceptInvitation(invitationId) {
        return $axios.post(`${this.apiPrefix}/${invitationId}`, {"accepted": true}).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }

    static async rejectInvitation(invitationId) {
        return $axios.post(`${this.apiPrefix}/${invitationId}`, {"accepted": false}).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }
}
