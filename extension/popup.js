const MASCOTS = [
  [1, "Thinker"], [2, "Sage"], [3, "Magician"], [4, "Footballer"],
  [5, "Programmer"], [6, "Lazy"], [7, "Fighter"], [8, "Crazy"],
  [9, "Grump"], [10, "Boxer"], [11, "Cowboy"], [12, "Grandpa"],
  [13, "Shocked"], [14, "Partier"], [15, "Dreamer"], [16, "Rockstar"],
  [17, "Curious"], [18, "Luffy"], [19, "Excited"], [20, "Swimmer"],
];

const toggle = document.getElementById("enabled-toggle");
const select = document.getElementById("mascot-select");

for (const [id, label] of MASCOTS) {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = `#${id} — ${label}`;
  select.appendChild(option);
}

chrome.storage.local.get({ enabled: true, mascotId: 1 }, ({ enabled, mascotId }) => {
  toggle.checked = enabled;
  select.value = mascotId;
});

toggle.addEventListener("change", () => {
  chrome.storage.local.set({ enabled: toggle.checked });
});

select.addEventListener("change", () => {
  chrome.storage.local.set({ mascotId: Number(select.value) });
});
