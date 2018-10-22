function render() {
    // const now = new Date("2018-10-25T10:55:00+00:00")
    const now = new Date(new Date().toUTCString())

    function isToday(d1) {
      return d1.getUTCFullYear() === now.getUTCFullYear() &&
        d1.getUTCMonth() === now.getUTCMonth() &&
        d1.getUTCDate() === now.getUTCDate();
    }

    const todaySched = schedule
          .map(entry => {
              return {
                  start: new Date(entry['start']),
                  summary: entry['summary']
              }
          })
          .filter(entry => isToday(entry['start'])) // Only today
          .filter(entry => (entry['start'] > now)) // Filter past
          .sort((e1,e2) => (e1['start'] - e2['start']))

    const center = document.getElementById("center")
    const table = document.createElement('table')
    todaySched.forEach(entry => {
        const start = document.createElement('td')
        start.innerText = [
            entry['start'].getUTCHours() + 1, // London is UTC+1
            entry['start'].getUTCMinutes()
        ]
            .map(n => (new String(n)).padStart(2, '0'))
            .join(':')

        const summary = document.createElement('td')
        summary.innerText = entry['summary']

        const tableEntry = document.createElement('tr')
        tableEntry.appendChild(start)
        tableEntry.appendChild(document.createElement('td'))
        tableEntry.appendChild(summary)

        table.appendChild(tableEntry)
    })

    center.innerHTML = table.outerHTML
}

render()
setInterval(30 * 1000, render)
