<template>
  <div class="hero d-flex">
    <h2 class="cta ">
      Goditi il mare.<br />
      Al resto pensiamo noi.
    </h2>
  </div>

  <div class="sottohero">
    <h2 class="text-center my-5">Avventura a portata di pagaia</h2>
    <p class="text-center mb-3">
      Scopri le nostre offerte e prenota la tua prossima avventura in mare con
      Sardinia Water Rent!
    </p>
  </div>
  <article class="articolo container">
    <h2 class="prelist">Come funziona il noleggio?</h2>
    <div class="row lista">
    <div class="col-lg-6 noleggio  ">
      <ul class="list list-unstyled">
      <li><i class="bi bi-1-circle"></i>
         Accedi o registrati</li>
      <li><i class="bi bi-2-circle"></i>
        Scegli prodotto, quantità e data</li>
      <li><i class="bi bi-3-circle"></i>
        Conferma dalla pagina prenotazioni</li>
      <li><i class="bi bi-4-circle"></i>
        Vivi la tua avventura in mare</li>
      <li><i class="bi bi-5-circle"></i>
        Riconsegna senza pensieri</li>
    </ul>
    </div>
    <div class="col-lg-5 align-self-center">
      <img class="donna" src="../assets/img/mare1.jpg" alt="donna con tavola da surf" />
    </div>
    
    </div>
  </article>
  <section class="info container-fluid my-5">
    <h2 class="text-center mb-4">Dove trovarci</h2>
    <div class="row justify-content-center align-items-center">    
      <!-- Mappa a sinistra -->
      <div class="col-md-6 d-flex justify-content-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24210.6543210987!2d9.103!3d39.215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e735123456789%3A0xabcd123456789!2sCagliari!5e0!3m2!1sit!2sit!4v1694444444444!5m2!1sit!2sit"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

      <!-- Contatti a destra -->
      <div class="contatti col-md-4 text-center text-md-start mt-4 mt-md-0">
        <h3 class="mb-3">Sardinia Water Rent</h3>
        <p><i class="bi bi-geo-alt me-2"></i> Via del Mare, 123 – Cagliari (CA)</p>
        <p><i class="bi bi-telephone me-2"></i> +39 070 123456</p>
        <p><i class="bi bi-envelope me-2"></i> info@sardiniawaterrent.it</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* === BASE === */
.hero {
  padding-top: 100px;
  width: 100vw;
  height: 60vh;
  background: url('../assets/img/hero/hero1.png') no-repeat center center/cover;
  margin: 0 -0.7rem;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
}

.cta {
  color: white;
  text-shadow: 2px 8px 18px rgba(0, 0, 0, 1);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 4vw, 3rem);
  padding: 1rem 1rem 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.sottohero h2 {
  font-weight: 600;
  font-size: clamp(2rem, 5vw, 4.5rem);
}

.sottohero p {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 500;
  color: #6c757d;
  padding: 0 1rem;
}

/* === SEZIONE LISTA === */
.row.lista {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}

.noleggio {
  flex: 1 1 300px;
  max-width: 500px;
}

.donna {
  width: 100%;
/*   max-width: 450px; */
  max-height: 50vh;
  border-radius: 18px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

ul.list {
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 500;
  color: #6c757d;
}

li {
  padding: 1rem 0;
}

.prelist {
  font-size: clamp(2rem, 3.5vw, 3rem);
  text-align: center;
  color: black;
  font-weight: 600;
  font-size: clamp(1.3rem, 2.2vw, 1.8rem);
}

/* === SEZIONE INFO === */
iframe {
  border: 1px solid #ddd;
  border-radius: 2rem;
  width: 100%;
  height: 30vh;
}

section h2 {
  font-weight: 600;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: black;
  padding: 2rem 1rem;
}

.info h2 {
  font-size: clamp(2rem, 3.5vw, 3rem);
}

.contatti {
  padding-left: 2rem;
  font-size: clamp(1rem, 2vw, 1.5rem);
}

.bi {
  color: rgb(241, 99, 47);
}

/* === MEDIA QUERY TABLET (768px - 1024px) === */
@media (min-width: 768px) and (max-width: 1023px) {
  .hero {
    height: 55vh;
  }

  .row.lista {
    gap: 2rem;
    padding: 2rem 0;
    margin: 0;
  }

  .noleggio {
    display: flex;
    justify-content: center;
    flex: 1 1 100%;
    max-width: 100%;
    padding: 0 2rem;
  }
  .prelist {
    font-size: 2rem;
    margin-top: 3rem;
  }

  /* Immagine full-width anche su tablet */
  .donna {
    flex: 1 1 100%;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    border-radius: 0;
    max-width: 100vw;
  }

  ul.list {
    font-size: 1.3rem;
  }

  .contatti {
    padding-left: 2rem;
    text-align: left;
  }

  iframe {
    height: 35vh;
  }
}

/* === MEDIA QUERY DESKTOP LARGE === */
@media (min-width: 1024px) {
  .hero {
    height: 65vh;
  }

  .row.lista {
    gap: 6rem;
    padding: 2rem 3rem;
  }
  .prelist {
    font-size: 3rem;
    margin-bottom: 2rem;
    margin-top: 5rem;
  }

  .noleggio {
    flex: 0 1 45%;
  }

  .donna {
    flex: 0 1 40%;
  }

  iframe {
    height: 30vh;
  }
}

/* === MEDIA QUERY MOBILE (< 768px) === */
@media (max-width: 767px) {
  .hero {
    height: 50vh;
    padding-top: 80px;
  }

  .cta {
    font-size: 1.5rem;
    padding-left: 1.5rem;
  }

  .sottohero {
    padding: 1rem;
  }

  .row.lista {
    gap: 1.5rem;
    padding: 1rem 0;
    margin: 0;
  }

  .noleggio {
    text-align: start;
    max-width: 100%;
    padding: 0 2rem;
  }

  ul.list {
    padding: 0 0.5rem;
  }

  /* Immagine full-width su mobile */
  .donna {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    border-radius: 0;
  }

  iframe {
    height: 25vh;
  }

  section h2 {
    font-size: 1.6rem;
    padding: 1rem;
  }

  .contatti {
    padding-left: 1rem;
    padding-top: 1rem;
    font-size: 1rem;
    text-align: left !important;
  }

  .contatti p {
    padding-top: 0.5rem;
  }

  section.info {
    margin: 0;
    padding: 1rem 0;
  }
}

/* === MEDIA QUERY MOBILE EXTRA SMALL (< 576px) === */
@media (max-width: 576px) {
  .hero {
    height: 45vh;
  }

  .cta {
    font-size: 1.3rem;
    padding-left: 1rem;
  }

  .sottohero h2 {
    font-size: 1.6rem;
  }

  .sottohero p {
    font-size: 1.1rem;
  }

  ul.list {
    font-size: 1rem;
  }

  iframe {
    height: 22vh;
  }
}
  
</style>
