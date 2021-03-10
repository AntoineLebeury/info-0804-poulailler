DROP TABLE IF EXISTS mesures;
DROP TABLE IF EXISTS porte;

CREATE TABLE IF NOT EXISTS mesures (
  mesure_id SERIAL NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  temperature INT4,
  pression INT4,
  luminosite INT4,
  CONSTRAINT pk_mesures PRIMARY KEY (mesure_id)
);

CREATE TABLE IF NOT EXISTS porte (
  porte_id SERIAL NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  ouverte BOOLEAN NOT NULL,
  CONSTRAINT pk_porte PRIMARY KEY (porte_id)
);
