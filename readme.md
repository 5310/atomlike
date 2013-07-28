Atomlike
========

A prototype game created for [MiniLD#44 7DRTS]("http://www.ludumdare.com/compo/category/minild/7drts-minild-44/") in slightly less than a week.

(Try to) play it here: [5310.github.io/atomlike]("http://5310.github.io/atomlike")

The game has major problems! I do so hope that the performance logistics are solvable and I get to work on the original features. I'd hate to have to shelve yet _another_ game project that could've been playable :[


What is the point this Game?
----------------------------

The point of this game was to be a playable single-player tower-defense like survival slice of a multiplayer RTS game about amassing and indirectly controlling flocks of tiny homogeneous units whose varying properties and functionality is defined by the flocks that the player create and configure and the units themselves serve as resource in the game to trigger various more complex effects. All with minimal (lazy) art, and atomic-sounding pseudo-sci-fi fluff.

And while the _point_ remains, the _current version_ of game at the end of the week has been a _very_ cut-down fraction of the design: with but a single type of unit, not customization whatsoever, not even any unit creation, or the interesting abilities that use the tiny units as resource.


How to Play the _Current_ Version of the Game?
----------------------------------------------

I'm so glad you asked. Well, um, "poorly" will be the apt answer, still...

### Control
- Use the mouse to pan the map, and the mouse-wheel to zoom.
- Drag the larger colored circles (which will change the cursor to the hand) also called a Nucleon to move them around.

### Rules
- Particles -- which are the smaller circles and the main units of this game -- that belong to a Nucleon will try to follow it around the map.
- Particles will also attack any enemy Particles in range, and vice-versa.
- Waves of black colored enemy (called Anti-Particles, of course) particles will try to attack various Emitters on the map.
- A Nucleon will die if all particles under it die, and you will lose your already limited number of ways to influence the game.
- In order to "heal" a Nucleon, move it over to an Emitter, and it will try to add as many neutral Particles as it can to itself.
- The game ends when all you Nucleons are lost, or all your Emitters are gone. And all you get is a score tally.

That's it. If I can iron out the performance issues, then I will at least complete the planned features.

### Warning

- The game _will_ lag at some point. Please close the tab if it gets to be too much lest it crash your browser or worse...
- Totally forgot that the scrolling does not work in Firefox due to non-standard events. I'll fix it _later..._


Performance Roadblocks
----------------------

In my naiveté I had decided to build a game with massive amount of units and unit-to-unit logic in a browser. Every step of the way, I had to cut out the scale and scope just to make the game run.

As a result, not only is the 7DRTS prototype a much smaller and uninteresting part of the main design, it is also performing very poorly.

This is mostly because of the O(n^2) separation algorithm for the flocks. Without any sort of space-partitioning, this is very _very_ costly, as you can imagine.

In the next version, I intend to at least minimize the use of separating boids to only a single unit type, and every other type else will have linear flocking. The problem is, I didn't have time to implement any of the linear flocking behaviors planned, otherwise I would've removed the boid-flock altogether and the game would've been back to a playable state/scale again. 

I have some patterns planned, but they'll have to wait. (Famous last words.) But I still can think of way good way to emulate boid-like flocks (one of the needed flocking behaviors by unit type, and the only one used here) without going exponential, and I don have much confidence that implementing a BSP or something over Crafty will be feasible for me as of yet.

I _did_ painstakingly optimize the ranged attack type...by cheating and pruning the original unit vs unit targeting into something simpler. And for the other two planned types I intend to make similar linear logic so that it'll scale, I think.

Even then, the component based querying


An Overview of Planned Features
-------------------------------

- Most importantly, ability to create Nucleons.
- And customizing the flocks of particles.
	- Player will be able to change properties of various nucleons and their particles on the fly.
	- But with time commitment.
- Particle properties
	- At least three types or "Flavors" of particles which attack differently.
	- "Shells" that change Particle size and reaction to damage.
	- "Spins" that change attack style and effects.
	- "Density" that changes how tight or loose a nucleon's particles are.
	- "Momentum" a trade-off between speed and mass, which results in a faster particle or a particle more capable of resisting push and pushing itself.
	- Capacity of a nucleons.
	- Etc.
- Augmentation of particle properties.
	- Properties will increase in effect with time/
	- And player will get to choose to focus on a few of them.
- Particle collisions.
	- Ability to tactically control other particles around the map.
- Visibility
	- Nucleon position influences how much of a large map is visible.
- Fields
	- Areas of the map that affect the particles inside it directly in various ways, making for more interesting maps.
- Special abilities of Nucleons.
	- These will cost particles under its control to cast.
	- May be modal, such as an attractor, or instantaneous, such detonating a portion of total particles.
