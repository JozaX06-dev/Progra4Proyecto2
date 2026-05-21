-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema BaseDeDatosProyecto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BaseDeDatosProyecto` DEFAULT CHARACTER SET utf8;
USE `BaseDeDatosProyecto`;

-- -----------------------------------------------------
-- Table `usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(100) NOT NULL,
  `clave` VARCHAR(255) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `nacionalidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`nacionalidad` (
  `iso` VARCHAR(2) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`iso`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `caracteristica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`caracteristica` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `padre_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_caracteristica_padre_idx` (`padre_id` ASC) VISIBLE,
  CONSTRAINT `fk_caracteristica_padre`
    FOREIGN KEY (`padre_id`)
    REFERENCES `BaseDeDatosProyecto`.`caracteristica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`empresa` (
  `usuario_id` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `localizacion` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  CONSTRAINT `fk_empresa_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `BaseDeDatosProyecto`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `oferente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`oferente` (
  `usuario_id` INT NOT NULL,
  `identificacion` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NOT NULL,
  `nacionalidad_iso` VARCHAR(2) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `lugar_residencia` VARCHAR(250) NOT NULL,
  `cv` VARCHAR(255) NULL,
  PRIMARY KEY (`usuario_id`),
  INDEX `fk_nacionalidad_iso_idx` (`nacionalidad_iso` ASC) VISIBLE,
  CONSTRAINT `fk_oferente_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `BaseDeDatosProyecto`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_nacionalidad_iso`
    FOREIGN KEY (`nacionalidad_iso`)
    REFERENCES `BaseDeDatosProyecto`.`nacionalidad` (`iso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`administrador` (
  `usuario_id` INT NOT NULL,
  `identificacion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  CONSTRAINT `fk_administrador_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `BaseDeDatosProyecto`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `puesto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`puesto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NOT NULL,
  `salario` DOUBLE NOT NULL,
  `es_publico` TINYINT NOT NULL,
  `activo` TINYINT NOT NULL,
  `empresa_id` INT NOT NULL,
  `fecha_creacion` DATE NOT NULL DEFAULT (CURRENT_DATE),
  PRIMARY KEY (`id`),
  INDEX `empresa_id_idx` (`empresa_id` ASC) VISIBLE,
  CONSTRAINT `fk_empresa_id`
    FOREIGN KEY (`empresa_id`)
    REFERENCES `BaseDeDatosProyecto`.`empresa` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `requisito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`requisito` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `puesto_id` INT NOT NULL,
  `caracteristica_id` INT NOT NULL,
  `nivel_deseado` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_puesto_id_idx` (`puesto_id` ASC) VISIBLE,
  INDEX `fk_caracteristica_id_idx` (`caracteristica_id` ASC) VISIBLE,
  CONSTRAINT `fk_puesto_id`
    FOREIGN KEY (`puesto_id`)
    REFERENCES `BaseDeDatosProyecto`.`puesto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_requisito_caracteristica`
    FOREIGN KEY (`caracteristica_id`)
    REFERENCES `BaseDeDatosProyecto`.`caracteristica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `habilidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BaseDeDatosProyecto`.`habilidad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `oferente_id` INT NOT NULL,
  `caracteristica_id` INT NOT NULL,
  `nivel` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_oferente_id_idx` (`oferente_id` ASC) VISIBLE,
  INDEX `fk_caracteristica_id_idx` (`caracteristica_id` ASC) VISIBLE,
  CONSTRAINT `fk_oferente_id`
    FOREIGN KEY (`oferente_id`)
    REFERENCES `BaseDeDatosProyecto`.`oferente` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_habilidad_caracteristica`
    FOREIGN KEY (`caracteristica_id`)
    REFERENCES `BaseDeDatosProyecto`.`caracteristica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Datos iniciales: Admin de prueba
-- -----------------------------------------------------
INSERT INTO usuario (correo, clave, activo) VALUES ('admin@bolsa.com', '', 1);
INSERT INTO administrador (usuario_id, identificacion) VALUES (LAST_INSERT_ID(), '000000000');

-- -----------------------------------------------------
-- Datos iniciales: Características
-- -----------------------------------------------------
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Bases de Datos', NULL);
SET @baseDatos = LAST_INSERT_ID();
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Ciberseguridad', NULL);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Lenguajes de programación', NULL);
SET @lenguajes = LAST_INSERT_ID();
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Tecnologías Web', NULL);
SET @webTech = LAST_INSERT_ID();
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Testing', NULL);
SET @testing = LAST_INSERT_ID();

-- Hijos de Bases de Datos
INSERT INTO caracteristica (nombre, padre_id) VALUES ('MySQL', @baseDatos);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Oracle', @baseDatos);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('MongoDB', @baseDatos);

-- Hijos de Lenguajes de programación
INSERT INTO caracteristica (nombre, padre_id) VALUES ('C#', @lenguajes);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Java', @lenguajes);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Kotlin', @lenguajes);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Python', @lenguajes);

-- Hijos de Tecnologías Web
INSERT INTO caracteristica (nombre, padre_id) VALUES ('HTML', @webTech);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('CSS', @webTech);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('JavaScript', @webTech);

-- Hijos de Testing
INSERT INTO caracteristica (nombre, padre_id) VALUES ('JUnit', @testing);
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Selenium', @testing);

-- Nietos
SET @java = (SELECT id FROM caracteristica WHERE nombre = 'Java');
INSERT INTO caracteristica (nombre, padre_id) VALUES ('Spring Boot', @java);
SET @mysql = (SELECT id FROM caracteristica WHERE nombre = 'MySQL');
INSERT INTO caracteristica (nombre, padre_id) VALUES ('MySQL Workbench', @mysql);

-- Nacionalidades
INSERT INTO nacionalidad (iso, nombre, descripcion) VALUES
('AF', 'AFGHANISTAN', 'Afghanistan'),
('AL', 'ALBANIA', 'Albania'),
('DZ', 'ALGERIA', 'Algeria'),
('AS', 'AMERICAN SAMOA', 'American Samoa'),
('AD', 'ANDORRA', 'Andorra'),
('AO', 'ANGOLA', 'Angola'),
('AI', 'ANGUILLA', 'Anguilla'),
('AQ', 'ANTARCTICA', 'Antarctica'),
('AG', 'ANTIGUA AND BARBUDA', 'Antigua and Barbuda'),
('AR', 'ARGENTINA', 'Argentina'),
('AM', 'ARMENIA', 'Armenia'),
('AW', 'ARUBA', 'Aruba'),
('AU', 'AUSTRALIA', 'Australia'),
('AT', 'AUSTRIA', 'Austria'),
('AZ', 'AZERBAIJAN', 'Azerbaijan'),
('BS', 'BAHAMAS', 'Bahamas'),
('BH', 'BAHRAIN', 'Bahrain'),
('BD', 'BANGLADESH', 'Bangladesh'),
('BB', 'BARBADOS', 'Barbados'),
('BY', 'BELARUS', 'Belarus'),
('BE', 'BELGIUM', 'Belgium'),
('BZ', 'BELIZE', 'Belize'),
('BJ', 'BENIN', 'Benin'),
('BM', 'BERMUDA', 'Bermuda'),
('BT', 'BHUTAN', 'Bhutan'),
('BO', 'BOLIVIA', 'Bolivia'),
('BA', 'BOSNIA AND HERZEGOVINA', 'Bosnia and Herzegovina'),
('BW', 'BOTSWANA', 'Botswana'),
('BV', 'BOUVET ISLAND', 'Bouvet Island'),
('BR', 'BRAZIL', 'Brazil'),
('IO', 'BRITISH INDIAN OCEAN TERRITORY', 'British Indian Ocean Territory'),
('BN', 'BRUNEI DARUSSALAM', 'Brunei Darussalam'),
('BG', 'BULGARIA', 'Bulgaria'),
('BF', 'BURKINA FASO', 'Burkina Faso'),
('BI', 'BURUNDI', 'Burundi'),
('KH', 'CAMBODIA', 'Cambodia'),
('CM', 'CAMEROON', 'Cameroon'),
('CA', 'CANADA', 'Canada'),
('CV', 'CAPE VERDE', 'Cape Verde'),
('KY', 'CAYMAN ISLANDS', 'Cayman Islands'),
('CF', 'CENTRAL AFRICAN REPUBLIC', 'Central African Republic'),
('TD', 'CHAD', 'Chad'),
('CL', 'CHILE', 'Chile'),
('CN', 'CHINA', 'China'),
('CX', 'CHRISTMAS ISLAND', 'Christmas Island'),
('CC', 'COCOS (KEELING) ISLANDS', 'Cocos (Keeling) Islands'),
('CO', 'COLOMBIA', 'Colombia'),
('KM', 'COMOROS', 'Comoros'),
('CG', 'CONGO', 'Congo'),
('CD', 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', 'Congo, the Democratic Republic of the'),
('CK', 'COOK ISLANDS', 'Cook Islands'),
('CR', 'COSTA RICA', 'Costa Rica'),
('CI', 'COTE DIVOIRE', 'Cote DIvoire'),
('HR', 'CROATIA', 'Croatia'),
('CU', 'CUBA', 'Cuba'),
('CY', 'CYPRUS', 'Cyprus'),
('CZ', 'CZECH REPUBLIC', 'Czech Republic'),
('DK', 'DENMARK', 'Denmark'),
('DJ', 'DJIBOUTI', 'Djibouti'),
('DM', 'DOMINICA', 'Dominica'),
('DO', 'DOMINICAN REPUBLIC', 'Dominican Republic'),
('EC', 'ECUADOR', 'Ecuador'),
('EG', 'EGYPT', 'Egypt'),
('SV', 'EL SALVADOR', 'El Salvador'),
('GQ', 'EQUATORIAL GUINEA', 'Equatorial Guinea'),
('ER', 'ERITREA', 'Eritrea'),
('EE', 'ESTONIA', 'Estonia'),
('ET', 'ETHIOPIA', 'Ethiopia'),
('FK', 'FALKLAND ISLANDS (MALVINAS)', 'Falkland Islands (Malvinas)'),
('FO', 'FAROE ISLANDS', 'Faroe Islands'),
('FJ', 'FIJI', 'Fiji'),
('FI', 'FINLAND', 'Finland'),
('FR', 'FRANCE', 'France'),
('GF', 'FRENCH GUIANA', 'French Guiana'),
('PF', 'FRENCH POLYNESIA', 'French Polynesia'),
('TF', 'FRENCH SOUTHERN TERRITORIES', 'French Southern Territories'),
('GA', 'GABON', 'Gabon'),
('GM', 'GAMBIA', 'Gambia'),
('GE', 'GEORGIA', 'Georgia'),
('DE', 'GERMANY', 'Germany'),
('GH', 'GHANA', 'Ghana'),
('GI', 'GIBRALTAR', 'Gibraltar'),
('GR', 'GREECE', 'Greece'),
('GL', 'GREENLAND', 'Greenland'),
('GD', 'GRENADA', 'Grenada'),
('GP', 'GUADELOUPE', 'Guadeloupe'),
('GU', 'GUAM', 'Guam'),
('GT', 'GUATEMALA', 'Guatemala'),
('GN', 'GUINEA', 'Guinea'),
('GW', 'GUINEA-BISSAU', 'Guinea-Bissau'),
('GY', 'GUYANA', 'Guyana'),
('HT', 'HAITI', 'Haiti'),
('HM', 'HEARD ISLAND AND MCDONALD ISLANDS', 'Heard Island and Mcdonald Islands'),
('VA', 'HOLY SEE (VATICAN CITY STATE)', 'Holy See (Vatican City State)'),
('HN', 'HONDURAS', 'Honduras'),
('HK', 'HONG KONG', 'Hong Kong'),
('HU', 'HUNGARY', 'Hungary'),
('IS', 'ICELAND', 'Iceland'),
('IN', 'INDIA', 'India'),
('ID', 'INDONESIA', 'Indonesia'),
('IR', 'IRAN, ISLAMIC REPUBLIC OF', 'Iran, Islamic Republic of'),
('IQ', 'IRAQ', 'Iraq'),
('IE', 'IRELAND', 'Ireland'),
('IL', 'ISRAEL', 'Israel'),
('IT', 'ITALY', 'Italy'),
('JM', 'JAMAICA', 'Jamaica'),
('JP', 'JAPAN', 'Japan'),
('JO', 'JORDAN', 'Jordan'),
('KZ', 'KAZAKHSTAN', 'Kazakhstan'),
('KE', 'KENYA', 'Kenya'),
('KI', 'KIRIBATI', 'Kiribati'),
('KP', 'KOREA, DEMOCRATIC PEOPLES REPUBLIC OF', 'Korea, Democratic Peoples Republic of'),
('KR', 'KOREA, REPUBLIC OF', 'Korea, Republic of'),
('KW', 'KUWAIT', 'Kuwait'),
('KG', 'KYRGYZSTAN', 'Kyrgyzstan'),
('LA', 'LAO PEOPLES DEMOCRATIC REPUBLIC', 'Lao Peoples Democratic Republic'),
('LV', 'LATVIA', 'Latvia'),
('LB', 'LEBANON', 'Lebanon'),
('LS', 'LESOTHO', 'Lesotho'),
('LR', 'LIBERIA', 'Liberia'),
('LY', 'LIBYAN ARAB JAMAHIRIYA', 'Libyan Arab Jamahiriya'),
('LI', 'LIECHTENSTEIN', 'Liechtenstein'),
('LT', 'LITHUANIA', 'Lithuania'),
('LU', 'LUXEMBOURG', 'Luxembourg'),
('MO', 'MACAO', 'Macao'),
('MK', 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', 'Macedonia, the Former Yugoslav Republic of'),
('MG', 'MADAGASCAR', 'Madagascar'),
('MW', 'MALAWI', 'Malawi'),
('MY', 'MALAYSIA', 'Malaysia'),
('MV', 'MALDIVES', 'Maldives'),
('ML', 'MALI', 'Mali'),
('MT', 'MALTA', 'Malta'),
('MH', 'MARSHALL ISLANDS', 'Marshall Islands'),
('MQ', 'MARTINIQUE', 'Martinique'),
('MR', 'MAURITANIA', 'Mauritania'),
('MU', 'MAURITIUS', 'Mauritius'),
('YT', 'MAYOTTE', 'Mayotte'),
('MX', 'MEXICO', 'Mexico'),
('FM', 'MICRONESIA, FEDERATED STATES OF', 'Micronesia, Federated States of'),
('MD', 'MOLDOVA, REPUBLIC OF', 'Moldova, Republic of'),
('MC', 'MONACO', 'Monaco'),
('MN', 'MONGOLIA', 'Mongolia'),
('MS', 'MONTSERRAT', 'Montserrat'),
('MA', 'MOROCCO', 'Morocco'),
('MZ', 'MOZAMBIQUE', 'Mozambique'),
('MM', 'MYANMAR', 'Myanmar'),
('NA', 'NAMIBIA', 'Namibia'),
('NR', 'NAURU', 'Nauru'),
('NP', 'NEPAL', 'Nepal'),
('NL', 'NETHERLANDS', 'Netherlands'),
('AN', 'NETHERLANDS ANTILLES', 'Netherlands Antilles'),
('NC', 'NEW CALEDONIA', 'New Caledonia'),
('NZ', 'NEW ZEALAND', 'New Zealand'),
('NI', 'NICARAGUA', 'Nicaragua'),
('NE', 'NIGER', 'Niger'),
('NG', 'NIGERIA', 'Nigeria'),
('NU', 'NIUE', 'Niue'),
('NF', 'NORFOLK ISLAND', 'Norfolk Island'),
('MP', 'NORTHERN MARIANA ISLANDS', 'Northern Mariana Islands'),
('NO', 'NORWAY', 'Norway'),
('OM', 'OMAN', 'Oman'),
('PK', 'PAKISTAN', 'Pakistan'),
('PW', 'PALAU', 'Palau'),
('PS', 'PALESTINIAN TERRITORY, OCCUPIED', 'Palestinian Territory, Occupied'),
('PA', 'PANAMA', 'Panama'),
('PG', 'PAPUA NEW GUINEA', 'Papua New Guinea'),
('PY', 'PARAGUAY', 'Paraguay'),
('PE', 'PERU', 'Peru'),
('PH', 'PHILIPPINES', 'Philippines'),
('PN', 'PITCAIRN', 'Pitcairn'),
('PL', 'POLAND', 'Poland'),
('PT', 'PORTUGAL', 'Portugal'),
('PR', 'PUERTO RICO', 'Puerto Rico'),
('QA', 'QATAR', 'Qatar'),
('RE', 'REUNION', 'Reunion'),
('RO', 'ROMANIA', 'Romania'),
('RU', 'RUSSIAN FEDERATION', 'Russian Federation'),
('RW', 'RWANDA', 'Rwanda'),
('SH', 'SAINT HELENA', 'Saint Helena'),
('KN', 'SAINT KITTS AND NEVIS', 'Saint Kitts and Nevis'),
('LC', 'SAINT LUCIA', 'Saint Lucia'),
('PM', 'SAINT PIERRE AND MIQUELON', 'Saint Pierre and Miquelon'),
('VC', 'SAINT VINCENT AND THE GRENADINES', 'Saint Vincent and the Grenadines'),
('WS', 'SAMOA', 'Samoa'),
('SM', 'SAN MARINO', 'San Marino'),
('ST', 'SAO TOME AND PRINCIPE', 'Sao Tome and Principe'),
('SA', 'SAUDI ARABIA', 'Saudi Arabia'),
('SN', 'SENEGAL', 'Senegal'),
('CS', 'SERBIA AND MONTENEGRO', 'Serbia and Montenegro'),
('SC', 'SEYCHELLES', 'Seychelles'),
('SL', 'SIERRA LEONE', 'Sierra Leone'),
('SG', 'SINGAPORE', 'Singapore'),
('SK', 'SLOVAKIA', 'Slovakia'),
('SI', 'SLOVENIA', 'Slovenia'),
('SB', 'SOLOMON ISLANDS', 'Solomon Islands'),
('SO', 'SOMALIA', 'Somalia'),
('ZA', 'SOUTH AFRICA', 'South Africa'),
('GS', 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', 'South Georgia and the South Sandwich Islands'),
('ES', 'SPAIN', 'Spain'),
('LK', 'SRI LANKA', 'Sri Lanka'),
('SD', 'SUDAN', 'Sudan'),
('SR', 'SURINAME', 'Suriname'),
('SJ', 'SVALBARD AND JAN MAYEN', 'Svalbard and Jan Mayen'),
('SZ', 'SWAZILAND', 'Swaziland'),
('SE', 'SWEDEN', 'Sweden'),
('CH', 'SWITZERLAND', 'Switzerland'),
('SY', 'SYRIAN ARAB REPUBLIC', 'Syrian Arab Republic'),
('TW', 'TAIWAN, PROVINCE OF CHINA', 'Taiwan, Province of China'),
('TJ', 'TAJIKISTAN', 'Tajikistan'),
('TZ', 'TANZANIA, UNITED REPUBLIC OF', 'Tanzania, United Republic of'),
('TH', 'THAILAND', 'Thailand'),
('TL', 'TIMOR-LESTE', 'Timor-Leste'),
('TG', 'TOGO', 'Togo'),
('TK', 'TOKELAU', 'Tokelau'),
('TO', 'TONGA', 'Tonga'),
('TT', 'TRINIDAD AND TOBAGO', 'Trinidad and Tobago'),
('TN', 'TUNISIA', 'Tunisia'),
('TR', 'TURKEY', 'Turkey'),
('TM', 'TURKMENISTAN', 'Turkmenistan'),
('TC', 'TURKS AND CAICOS ISLANDS', 'Turks and Caicos Islands'),
('TV', 'TUVALU', 'Tuvalu'),
('UG', 'UGANDA', 'Uganda'),
('UA', 'UKRAINE', 'Ukraine'),
('AE', 'UNITED ARAB EMIRATES', 'United Arab Emirates'),
('GB', 'UNITED KINGDOM', 'United Kingdom'),
('US', 'UNITED STATES', 'United States'),
('UM', 'UNITED STATES MINOR OUTLYING ISLANDS', 'United States Minor Outlying Islands'),
('UY', 'URUGUAY', 'Uruguay'),
('UZ', 'UZBEKISTAN', 'Uzbekistan'),
('VU', 'VANUATU', 'Vanuatu'),
('VE', 'VENEZUELA', 'Venezuela'),
('VN', 'VIET NAM', 'Viet Nam'),
('VG', 'VIRGIN ISLANDS, BRITISH', 'Virgin Islands, British'),
('VI', 'VIRGIN ISLANDS, U.S.', 'Virgin Islands, U.s.'),
('WF', 'WALLIS AND FUTUNA', 'Wallis and Futuna'),
('EH', 'WESTERN SAHARA', 'Western Sahara'),
('YE', 'YEMEN', 'Yemen'),
('ZM', 'ZAMBIA', 'Zambia'),
('ZW', 'ZIMBABWE', 'Zimbabwe');

-- Clave de admin hash
UPDATE usuario SET clave = '$2b$12$sIzfNw.VU0ls5vNjiNoCmenlvzwmUj8cwBnS.ZRGvtMR4tGVEGek2' WHERE correo = 'admin@bolsa.com'; -- admin1234