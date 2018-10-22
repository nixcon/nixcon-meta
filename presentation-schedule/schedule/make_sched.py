#!/usr/bin/env nix-shell
#! nix-shell -p python3 python3Packages.icalendar -i python3
from icalendar import Calendar
from datetime import datetime
import json


if __name__ == '__main__':
    with open('schedule.ics','rb') as f:
        data = f.read()

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
