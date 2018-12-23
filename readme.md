#Naughty or Nice???
### BETTER CALL SANTA

@edwhelan :rocket:

An app to allow users to send an SMS message to Santa Claus :santa: and allow users to attempt to influence by way of voting on if they think something is 'Naughty or Nice'.

Built with: React, PostgreSQL, Node.js, Express, bCrypt, Twillio.
Deployed on Amazon EC2 Instance

Source code can be found at GitHub: https://github.com/edwhelan/snitch-app
Live Deploy can be found at: http://ec2-52-14-68-130.us-east-2.compute.amazonaws.com/

### Thoughts/Build Process
I knew I wanted to make an app with Twillio. I had attended a 'mini-hackathon' run by Twillio and afterwards had been trying to think of a fun use case for it. Enter Snitch-App. Originally the use would text in people doing good or bad things and it would be voted up or down. After thought I realized that wasnt a very fun idea. And so it was switched to people texting Santa Claus pictures and attempting to influence him through voting. I began by making the backend with PostgreSQL and hadnt intended for it to become a react-app at all. But I decided react state would allow me to give the site a very real time feel. 

### Future Plans
- [X] Update ReadMe.md for v1 deploy
- [ ] The style of the site needs another pass. I was pressed for time on deploy and mainly wanted to showcase the major function of the site. 
- [ ] Login/register buttons need to be made into proper modals.
- [ ] User settings page to allow for changing of password
- [ ] Syncing of pictures to users. defaulting in anonymous if no one registered under that number.
- [ ] Mobile pass. Site is usable but not the best.


#### Final Thoughts
Over all I had a lot of fun working on this project and excited to tinker with it going forward. 
For more of my work visit my portfolio site at http://www.edwhe.com and checkout my GitHub at https://www.github.com/edwhelan