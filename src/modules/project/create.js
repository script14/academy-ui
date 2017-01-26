import { bindable } from "aurelia-framework";

export class create {
  @bindable data;
  @bindable error;

  async activate() {
    this.data = {
      autocomplete: {
        avatar_url: "https://avatars.githubusercontent.com/u/4?v=3",
        events_url: "https://api.github.com/users/wycats/events{/privacy}",
        followers_url: "https://api.github.com/users/wycats/followers",
        following_url: "https://api.github.com/users/wycats/following{/other_user}",
        gists_url: "https://api.github.com/users/wycats/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/wycats",
        id: 4,
        login: "wycats",
        organizations_url: "https://api.github.com/users/wycats/orgs",
        received_events_url: "https://api.github.com/users/wycats/received_events",
        repos_url: "https://api.github.com/users/wycats/repos",
        site_admin: false,
        starred_url: "https://api.github.com/users/wycats/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/wycats/subscriptions",
        type: "User",
        url: "https://api.github.com/users/wycats"
      },
      dropdown: {
        value: 3,
        text: "Three"
      },
      items: [
        { id: 1, name: "One" },
        { id: 2, name: "Two" },
        { id: 3, name: "Three" }
      ]
    };
  }
}
