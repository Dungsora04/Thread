import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        postImg="/firefly_valentine.webp"
        postTitle={`Valentine’s Day, huh? Never really thought about it before… but I guess it’s nice. A day where people get to be honest about how they feel.

        You know, I don’t always get the chance to slow down and enjoy things. There’s always something to do, somewhere to go… But today, I want to stop and just—be here. With you.
        
        I don’t need chocolates, flowers, or fancy gifts. Just… stay with me a little longer, okay?
        
        Let’s make today count.
        `}
        postLikes={100}
        postReplies={21}
      />
      <UserPost
        postImg="/castorice_valentine.webp"
        postTitle={`A fleeting moment, like snow upon the river… Such is the nature of time, of love, of us.

        Yet, even the coldest of fates cannot silence the warmth of the heart. If this day is to be cherished, then let it be so—etched into memory, unyielding against oblivion.
        
        May your heart beat on, undaunted by the whispers of Thanatos.`}
        postLikes={500}
        postReplies={10}
      />
      <UserPost
        postImg="/rappa_valentine.webp"
        postTitle={`Yo! Listen up!

        Valentine’s Day… a battlefield of hearts, a clash of emotions! A true ninja must strike swiftly, decisively—
        
        Which is why I, Rappa, have already mastered the ultimate technique—Ningu: Secret Art - Love Confession Slash!
        
        What’s that? You were expecting chocolates? Pfft, nah! My gift is way better—
        
        A personalized haiku!
        Roses fade so fast—
        But ninja moves? Eternal!
        Now, gimme some sweets!
        
        Hah! That’s what I call ninja romance!`}
        postLikes={90}
        postReplies={21}
      />
    </>
  );
};

export default UserPage;
