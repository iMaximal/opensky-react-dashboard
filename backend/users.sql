CREATE TABLE users(
  username_hash character(128),
  password_hash character(128),
  session_id character(36)
);

INSERT INTO users(username_hash, password_hash) VALUES
('f547a05eff270edcb219842740b91035d2308ce8918e764d8fb38cf3f8cbdb15e4cc3be705af57c42a338b1651c446618dc42f6cd79201573c38134da8f11fa5',
 'f547a05eff270edcb219842740b91035d2308ce8918e764d8fb38cf3f8cbdb15e4cc3be705af57c42a338b1651c446618dc42f6cd79201573c38134da8f11fa5'),
('bar456', 'word456'),
('bar456', 'word456');
