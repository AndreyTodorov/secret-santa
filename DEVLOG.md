## Configs

    [x] ESlint
    [x] env + Config validation
    [x] Husky
    [x] github actions
    [x] Scripts in package.json
    [x] docker database
    [x] Tailwind configs

## TODO:

    [ ] figure out custom layouts?
    [X] add user pic from session
    [X] implement caching the deps on github actions
    [] extract the buttom from the modal
    [] use tailwind ui components

# Fasting Tracker

    [X] get list of intake records
        [X] implement pagination
        [X] BE route to collect the intakes
        [X] component card to show single day intakes
        [X] edit records
        [X] create records from the site
        [] when updating, set the cache entry, don't invalidate

    [] make web take advantage of the space: make the cards smaller and horizontal layout
    [] show basic stats
    [] show fansy stats

# Secret santa

## Party creation steps

    1. [X] General Info party form
    2. Add users
        [] Quick add Participant form
        [] All Participant section
            [] Show list of all Participant
            [] Above the list - add Participant form
        [] Invitation
            - send email with link to be followed
            - page with Quick add Participant form
            - submit and add the Participant to the party
    3. Make the draw
    4. Send email with party details and who are you giving gift to

## Draw logic

    [] how we will determine the roles of all users
    [] add draw table to DB

## Onboarding

    [] fill the participant of the current user
    [] some user settings
    [] create your first Party
