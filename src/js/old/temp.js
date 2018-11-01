/**
 * Created by Nathan on 2/4/2018.
 */
/* PROBLEMS
 * Nature of the current action system causes actions to overwrite in an undesired way between updates
 * NPC behavior calls seek(), which bumps and sets an attack, but then gets overwritten by next seek
 * Update so all action behavior and consequences are evaluated by an Action class. NOT by NPC behavior.
 * Behavior should decide what to do, let the action resolve it. Maintain an action queue if necessary, push to end.
 */


//Action class should handle outcomes and triggering additional actions as necessary by individual actions.
class Action {

}





//A* ALGORITHM START

//A* ALGORITHM END



//REACTION Definitions








//CLASSES









