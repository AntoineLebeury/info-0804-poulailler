DROP TABLE IF EXISTS mesures;

CREATE TABLE IF NOT EXISTS mesures (
  mesure_id SERIAL NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  temperature INT4,
  pression INT4,
  luminosite INT4,
  CONSTRAINT pk_mesures PRIMARY KEY (mesure_id)
);
