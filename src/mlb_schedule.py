"""
Forked from https://github.com/tash1207/MLB-Schedule
"""

import csv
import datetime
import pytz
import urllib
import urllib2

def get_mlb_schedule(team_id, season):
  """Takes in a team id and season year and returns a csv of the team's schedule.
  Args:
    team_id: id for the mlb team whose schedule you want (Ex. 137 = SF Giants)
    season: year of the schedule (Ex. 2014)

  Returns:
    A csv with all schedule info for that team during that season
  """

  url = 'http://mlb.mlb.com/soa/ical/schedule.csv'
  data = {}
  data['team_id'] = team_id
  data['season'] = season
  values = urllib.urlencode(data)

  full_url = url + '?' + values
  request = urllib2.Request(full_url)
  response = urllib2.urlopen(request)
  sched_csv = response.read()
  return sched_csv

def parse_csv(sched_csv):
  """Parses a csv into a python dict."""
  try:
    sched_dict = csv.DictReader(sched_csv.split('\n'), delimiter=',')
    return sched_dict
  except:
    print "There was an error parsing the csv"
    return None

def compare_dates(today_date, game_date):
  """Compares 2 dates of different formats and determines if they are the same.
  Args:
    today_date: today's date in format yyyy-mm-dd
    game_date: date of the baseball game in format mm/dd/yy

  Returns:
    True if dates are the same, False if not
  """
  game_date_list = game_date.split('/')
  today_date_list = str(today_date).split('-')
  if game_date_list[0] == today_date_list[1] and game_date_list[1] == today_date_list[2]:
    return True
  else:
    return False

def get_todays_game():
  """ Search through all the games today and return all games today """
  today = datetime.datetime.now(pytz.timezone('America/Los_Angeles')).date()
  # Set team_id to the SF Giants
  team_id = 137
  season = 2015
  sched_csv = get_mlb_schedule(team_id, season)
  sched_dict = parse_csv(sched_csv)
  games = []
  for line in sched_dict:
    if line['LOCATION'] != 'AT&T Park':
      continue
    game_date = line['START_DATE']
    if not compare_dates(today, game_date):
      continue
    games.append(line)
  return games


def main():
  games = get_todays_game()
  for game in games:
    print game['SUBJECT'], game['START_DATE'], game['START_TIME']

if __name__ == '__main__':
  main()
