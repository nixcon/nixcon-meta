#!/usr/bin/env nix-shell
#! nix-shell -p python3 python3Packages.icalendar python3Packages.requests -i python3
from icalendar import Calendar
from datetime import datetime
import requests

import json


if __name__ == '__main__':
    data = requests.get("https://cfp.nixcon.org/nixcon2019/schedule/export/schedule.ics").text

    gcal = Calendar.from_ical(data)
    sched = []
    for component in gcal.walk():
        if component.name != "VEVENT":
            continue

        dt = component.get('dtstart').dt
        # Filter headings
        if not isinstance(dt, datetime):
            continue

        sched.append({
            'start': dt.isoformat(),
            'summary': component.get('summary'),
        })

    with open('../schedule.js', 'w') as f:
        s = 'const schedule = {}'.format(json.dumps(sched))
        f.write(s)
