class GitHub {
    constructor() {
        this.client_id = "7ab84464e7b04958d6e2";
        this.client_secret = "08544e3bd1b6710527b993d7db554415a615b7ce";
        this.repos_count = 5;
        this.repos_sort = "created: asc";
    }

    async getUser(user) {
        let profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        let repoResponse = await fetch(
            `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
        );
        if (profileResponse.status !== 200) {
            profileResponse = await fetch(`https://api.github.com/users/${user}`);
            repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`);
        }
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        return {
            profile,
            repos,
        };
    }
}
