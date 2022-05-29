import $axios from "./axiosRequests";


export class invitationsAPI {

    static async getOutgoingTeamInvitations() {
        return $axios.get(`/schedule/team/invite?criteria=inviting`).then(res => {
            return res.data["teamInvites"];
        }).catch(() => {
            return [];
        });
    }

    static async getIncomingTeamInvitations() {
        return $axios.get(`/schedule/team/invite?criteria=invited`).then(res => {
            return res.data["teamInvites"];
        }).catch(() => {
            return [];
        });
    }

    static async createInvitation(data) {
        return (await $axios.post(`/schedule/team/invite`, data)).data;
    }

    static async acceptInvitation(invitationId) {
        return $axios.patch(`/schedule/team/invite`, {"status": "accepted", id: invitationId}).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }

    static async rejectInvitation(invitationId) {
        return $axios.patch(`/schedule/team/invite`, {"status": "rejected", id: invitationId}).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }
}
