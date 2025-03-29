function DogCard({ dog, addToBanList }) {
    const breed = dog.breeds?.[0]?.name || "Unknown Breed";
  
    return (
      <div className="dog-card">
        <img src={dog.url} alt="A cute dog" />
        <p>
          Breed: <span onClick={() => addToBanList(breed)}>{breed}</span>
        </p>
      </div>
    );
  }
  
  export default DogCard;
  