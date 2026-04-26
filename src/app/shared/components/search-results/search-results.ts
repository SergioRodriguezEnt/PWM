import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {OutfitService} from '../../../core/outfit.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
  imports: [
    NgOptimizedImage
  ]
})
export class SearchResults implements OnInit, OnDestroy {
  private outfitService = inject(OutfitService);
  private imageSrcs: string[] = [];
  private subscription: Subscription | undefined;

  column1 = computed(() => this.imageSrcs.filter((val, index) => index % 4 === 0))
  column2 = computed(() => this.imageSrcs.filter((val, index) => index % 4 === 1))
  column3 = computed(() => this.imageSrcs.filter((val, index) => index % 4 === 2))
  column4 = computed(() => this.imageSrcs.filter((val, index) => index % 4 === 3))

  ngOnInit() {
    this.subscription = this.outfitService.getOutfits().subscribe(outfits => this.imageSrcs=outfits.map(outfit => outfit.src))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
/*async function loadSearchResults(data) {
  let outfits = filterOutfits(data, getParam("username"), getParam("search"));
  let columns = document.querySelectorAll(".columna");
  let column = 0;
  for (let outfit of outfits) {
    columns.item(column).appendChild(htmlOf(outfit));
    column++;
    if (column === 4) column = 0;
  }
}

function filterOutfits(data, user = null, title = null) {
  return data.filter((outfit) => {
    const matchesUser = user ? outfit.user === user : true;
    const matchesTitle = title ? outfit.title.includes(title) : true;
    return matchesUser && matchesTitle;
  });
}

function htmlOf(outfit) {
  let img = document.createElement("img");
  img.src = outfit.src;
  img.alt = outfit.title;
  let btn = document.createElement("button");
  btn.appendChild(img);
  btn.dataset.id = outfit.id;
  return btn;
}

async function setupSearchResults() {
  let root = document.querySelector(".results");
  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button.dataset.id);
      let page = getLocal("user") ? "outfit-with-user" : "outfit-no-user";
      window.location.href =
        "/PWM/src/pages/html/" + page + ".html?id=" + button.dataset.id;
    });
  });
}*/
