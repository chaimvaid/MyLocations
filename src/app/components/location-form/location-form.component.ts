import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup,  Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import * as LocationsActions from '../../reducers/locations/locations.actions';
import {MatSnackBar} from '@angular/material';
// import {ValidationServiceService} from '../../services/validation-service.service';

import * as Redux from 'redux';
import {
    AppState,
} from '../../app.reducer';
import { AppStore } from '../../app.store';
import {Category, Location} from '../../interfaces/interfaces';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js';
import Vector from 'ol/source/Vector.js';
import LayerVector from 'ol/layer/Vector.js';
import * as Proj from 'ol/proj.js';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {
    mapDisplay = false;
    map: Map;
    marker: any;
    locationForm: FormGroup;
    categories: Category[];
    constructor(
        @Inject(AppStore) public store: Redux.Store<AppState>,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
        // private vs: ValidationServiceService,
    ) {
        let location;
        this.route.params.subscribe((params) => {
            if (!params['id']) {
                location = new LocationForm();
            } else {
                location = this.store.getState().locations.find((l) => {
                    return l.id == params['id'];
                });
            }
            this.locationForm = this.fb.group(
                {
                    id: location.id,
                    name: [location.name, Validators.required],
                    address: [location.address, Validators.required],
                    coordinates: fb.group({
                        lon: [location.coordinates.lon, Validators.required],
                        lat: [location.coordinates.lat, Validators.required],
                    }),
                    categories: [location.categories, Validators.required]
                }
            );
        });


        this.categories = this.store.getState().categories;
    }

    ngOnInit() {
        // if !coordinates center will be Jerusalem
        const center = this.locationForm.controls.coordinates.valid ?
            Proj.fromLonLat([this.locationForm.controls.coordinates.value.lon, this.locationForm.controls.coordinates.value.lat]) :
            [3922047.1559, 3740562.5575];



        this.map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            target: 'map',
            view: new View({
                center: center,
                zoom: 13
            })
        });
        this.setMarker(center);

        // Set new coordinate when map  clicked and then close map display.
        this.map.on('click', (e) => {
            const lonLat = Proj.toLonLat(e.coordinate);
            this.locationForm.controls.coordinates.setValue({lon: lonLat[0], lat: lonLat[1]});
            this.setMarker(e.coordinate);
            this.mapDisplay = false;
        });

        console.log(this.map);
    }

    submit(): void {
        if (this.locationForm.valid) {
            const formValue = this.locationForm.value;
            this.store.dispatch(formValue.id ? LocationsActions.editLocation(formValue) : LocationsActions.addLocation(formValue));
            this.router.navigate(['/locations']);
        } else {
            this.snackBar.open('There Is Required Fields !', null, {
                duration: 2000,
            });
            for (const key in this.locationForm.controls) {
                this.locationForm.controls[key].markAsTouched();
            }
            for (const key in this.locationForm.controls['coordinates']['controls']) {
                this.locationForm.controls['coordinates']['controls'][key].markAsTouched();
            }
        }
    }

    setMarker(coordinate): void {
        console.log(coordinate);
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
        const iconFeature = new Feature({
            geometry: new Point(coordinate)
        })
        const iconStyle = new Style({
            image: new Icon(({
                anchor: [0.5, 1],
                src: "http://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1"
            }))
        });

        iconFeature.setStyle(iconStyle);


        const vectorSource = new Vector({
            features: [iconFeature]
        });

        const vectorLayer = new LayerVector({
            source: vectorSource
        });
        this.marker = vectorLayer
        this.map.addLayer(this.marker);
    }

}

class LocationForm implements Location {
    id          = null;
    name        = null;
    address     = null;
    coordinates = {lon: null, lat: null};
    categories = [];
}
