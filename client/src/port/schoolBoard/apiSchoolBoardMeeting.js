export const create = (userId, token, schoolBoardMeeting) => {
    return fetch(`/portschoolBoardMeeting/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: schoolBoardMeeting
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`/portschoolBoardMeeting`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (userId, token) => {
    return fetch(`/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleschoolBoardMeeting = (schoolBoardMeetingId) => {
    return fetch(`/portschoolBoardMeeting/${schoolBoardMeetingId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (schoolBoardMeetingId, token) => {
    return fetch(`/portschoolBoardMeeting/delete/${schoolBoardMeetingId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (schoolBoardMeetingId, token, schoolBoardMeeting) => {
    return fetch(`/portschoolBoardMeeting/edit/${schoolBoardMeetingId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: schoolBoardMeeting
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};