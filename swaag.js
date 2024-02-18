mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnlyb2JiIiwiYSI6ImNsc3E5cWZwbTB6MWQybm51ZWhnNXZqdGYifQ.VP-6WVFeERn_zB1sN8PZdA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/examples/clg45vm7400c501pfubolb0xz',
      center: [-87.661557, 41.893748],
      zoom: 10.7
    });

    map.on('click', (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: ['chicago-parks']
      });
      if (!features.length) {
        return;
      }
      const feature = features[0];

      const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p><button`

        )
        .addTo(map);
      

    });
    function addMarker() {
      const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat([-87.637596, 41.940403])
        .setHTML(
          `<h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p><h3>Lincoln Park</h3><p>A northside park that is home to the Lincoln Park Zoo</p>`

        )
        .addTo(map);
    }