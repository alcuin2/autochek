## Installation

* clone repo
* `cd` into repo directory and run `npm install`

### Run app
* Run `npm run serve`

### Endpoints
* `/topwordstitle/<number_of_stories/<count>/`: Note that `number_of_stories` and `count` parameters are optional. When not provided, it defaults to `25` and `10` respectively.


* `/topwordstitleweek/<weeks>/<count>/`: Note that `weeks` and `count` parameters are optional. When not provided, `weeks` defaults to `1` for the last week and `count` to `10`. A value of `2` for `weeks` will mean last 2 weeks.


* `/userstories/<number_of_stories>/<karma>`: Also note that the `number_of_stories` and `karma` parameters are optional, they default to `600` and `10` respectively. The `HackerNews` API sometimes delays in returning `users`data, this should be considered when testing.



### Todos
Full swagger documentations and tests.