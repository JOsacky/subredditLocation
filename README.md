## Subreddit Location Map

### Dependencies
* Python 2.xx
* `sudo pip install requests`
* `sudo pip install lxml`
  * For OS X: `STATIC_DEPS=true sudo pip install lxml`

### Run Instructions
1. `git clone https://github.com/JOsacky/subredditLocation.git`
2. `cd subredditLocation`
3. `python -m SimpleHTTPServer`
4. Open browser
  * *http://localhost:8000/web/index.html*

### Features
* Red dots symbolize the # of subscribers for that city's subreddit
* Blue shadows symbolize the # of active users (snapshot)
* Click the red dots to redirect to that subreddit

