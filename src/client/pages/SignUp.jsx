import React from 'react';

export default () => <form id="signup" name="signup" method="post" action="/signup">
  <label for="email">Email Address</label>
  <input class="text" name="email" type="email" />
  <label for="firstname">Firstname</label>
  <input name="firstname" type="text" />
  <label for="lastname">Lastname</label>
  <input name="lastname" type="text" />
  <label for="password">Password</label>
  <input name="password" type="password" />
  <br/>
  <label for="type">What's your role?</label>
  <select>
   <option value="hacker">Hacker</option>
   <option value="sponsor">Sponsor</option>
   <option value="volunteer">Volunteer</option>
   <option value="judge">Judge</option>
  </select>
  <input name="file" type="file">
  <input class="btn" type="submit" value="Sign Up" />
</form>;
