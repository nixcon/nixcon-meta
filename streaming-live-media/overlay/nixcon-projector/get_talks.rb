#!/usr/bin/env nix-shell
#! nix-shell -p ruby curl -i ruby

require "json"
require "shellwords"

def get(url)
  `#{["curl", url].shelljoin}`
end

# Joins with commas, except for the last element
def andize(arr)
  return arr.first if arr.length < 2

  arr = Array.new(arr)
  last = arr.pop

  [
    arr.join(", "),
    last
  ].join(" and ")
end

BASE = "https://cfp.nixcon.org"
EVENT = "nixcon2019"

# Do the API call
data = JSON.parse(get("#{BASE}/api/events/#{EVENT}/talks/"))

# Checks there's no paging... if there is we need to review this script.
abort "Unexpected paging" if data["next"]

# Get only the results
data = data["results"]

# Sort those results according to the start time.
# Easier to use that way for the presets
data.sort! { |a, b| a["slot"]["start"] <=> b["slot"]["start"] }

# Manipulate the data for our preset
# FIXME: multiple speakers what?
preset = data.map do |talk|
  speakers = talk["speakers"]
  speaker_names = andize(speakers.map {|s| s["name"]})

  # FIXME: download avatar
  avatar = ""
  [
    {
      _id: "[TITLE]: #{talk["title"]} (#{speaker_names})",
      name: speaker_names,
      talk: talk["title"],
      alias: "",
      avatar: "",
      gfx: "title",
    }
  ] + speakers.map do |speaker|
    name = speaker["name"]
    avatar = speaker["avatar"] || ""
    {
      _id: "[NAME]: #{name}",
      name: name,
      talk: talk["title"],
      alias: "",
      avatar: "",
      gfx: "name",
    }
  end
end
  .flatten

puts preset.to_json
