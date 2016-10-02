## selfie-move-seafile

This tiny script move the `selfies` folder from the selfie machine sync repo to the final archive repo.
It's called via cronjob.

A repo is a Seafile library.

### Crontab
```
30 7 * * * /usr/bin/node /opt/selfie-move-seafile/moveSelfies.js
```