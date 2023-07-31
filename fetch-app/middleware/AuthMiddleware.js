module.exports = async (req, res, next) => {
  try {
    const Authorization = req.headers["authorization"];
    const response = await fetch(`${process.env.AUTH_APP_URL}/me`, {
      headers: { Authorization },
    });
    if (response.status !== 200)
      return res.status(401).json({ msg: "unauthenticated" });

    let data = await response.json();
    next();
  } catch (error) {
    return res.status(401).json({ msg: "unauthenticated" });
  }
};
