const useAuthenticated = () => {
    let authUser;
    let authFlag = false;
    return [authUser, authFlag];
};

export default useAuthenticated;
