export const getAllSauces = (req, res) => {
  res.status(200).json({ message: 'all sauce' });
};

export const getOneSauce = (req, res) => {
  res.status(200).json({ message: 'one sauce' });
};

export const addOneSauce = (req, res) => {
  res.status(201).json({ message: 'sauce created' });
};

export const editOneSauce = (req, res) => {
  res.status(201).json({ message: 'sauce edited' });
};

export const deleteOneSauce = (req, res) => {
  res.status(201).json({ message: 'sauce deleted' });
};

export const likeOneSauce = (req, res) => {
  res.status(201).json({ message: 'sauce liked' });
};

