import $axios from "../axiosRequests";


export class invitations {
    static prefixUrl = "/schedule/team";

    static async getOutgoingTeamInvitations() {
        return $axios.get(`${this.prefixUrl}/invite?criteria=inviting`).then(res => {
            return res.data["teamInvites"];
        }).catch(() => {
            return [];
        });
    }

    static async getIncomingTeamInvitations() {
        return $axios.get(`${this.prefixUrl}/invite?criteria=invited`).then(res => {
            return res.data["teamInvites"];
        }).catch(() => {
            return [];
        });
    }

    static async create(data) {
        return (await $axios.post(`${this.prefixUrl}/invite`, data)).data;
    }

    static async accept(invitationId) {
        return $axios.patch(`${this.prefixUrl}/invite`, {"status": "accepted", id: invitationId}).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }

    static async reject(invitationId) {
        return $axios.patch(`${this.prefixUrl}/invite`, {"status": "rejected", id: invitationId}).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }
}
