<script setup lang="ts">
import {onMounted, reactive, shallowRef} from 'vue'
import {RandomItemGenerator} from "./RandomItemGenerator.ts";

const WORDS = [
  { kanji: '暇', translation: 'свободный' },
  { kanji: '黒', translation: 'черный' },
  { kanji: '赤', translation: 'красный' },
  { kanji: '有名', translation: 'знаменитый' },
  { kanji: '写真', translation: 'фотография' },
  { kanji: '宿題', translation: 'домашнаяя работа' },

  { kanji: '好き', translation: 'любимое' },
  { kanji: '嫌い', translation: 'ненавидимое' },
  { kanji: '上手', translation: 'умелый' },
  { kanji: '下手', translation: 'неумелый' },
  { kanji: '飲み物', translation: 'напиток' },
  { kanji: '料理', translation: 'готовка' },
  { kanji: '野球', translation: 'бейсбол' },
  { kanji: '旅行', translation: 'путешествие' },
  { kanji: '音楽', translation: 'музыка' },
  { kanji: '歌', translation: 'песня' },
  { kanji: '絵', translation: 'картина' },
  { kanji: '用事', translation: 'дела' },
  { kanji: '約束', translation: 'обещание' },
  { kanji: '時間', translation: 'время' },
  { kanji: '漢字', translation: 'кандзи' },
  { kanji: 'ご主人', translation: 'мой муж' },
  { kanji: '夫', translation: 'ее муж' },
  { kanji: '妻', translation: 'моя жена' },
  { kanji: '奥さん', translation: 'его жена' },
] as const;
type Word = typeof WORDS[number];

type Round = {
  variants: Word[],
  currentWord: Word,
};

const round = shallowRef<Round | null>(null);
const count = reactive({
  correct: 0,
  wrong: 0,
});

const roundWordGenerator = new RandomItemGenerator(WORDS);

function generateVariants(currentWord: Word) {
  const restWords = WORDS.filter(x => x !== currentWord);

  return restWords
      .sort(() => Math.random() * 2 - 1)
      .slice(0, 5)
      .concat(currentWord)
      .sort(() => Math.random() * 2 - 1);
}

function getRound() {
  const currentWord = roundWordGenerator.nextItem();

  return {
    variants: generateVariants(currentWord),
    currentWord,
  }
}

function checkAnswer(round: Round, word: Word) {
  const isCorrect = round.currentWord === word;

  if (isCorrect) {
    count.correct++;
    roundWordGenerator.countUpdate(word);
  } else {
    count.wrong++;
  }

  return isCorrect;
}

onMounted(() => {
  initNewRound();
});

function initNewRound() {
  round.value = getRound();
}

function handleAnswerClick(word: Word) {
  if (!round.value) return;

  checkAnswer(round.value, word);
  initNewRound();
}
</script>

<template>
  <div class="text-white w-700px h-vh bg-indigo-300 p-15px flex flex-col items-center" v-if="round">
    <div class="font-600 font-size-60px">{{ round.currentWord.kanji ?? '-' }}</div>
    <div>{{ count }}</div>
    <div class="grid grid-cols-3 gap-10px mt-auto pb-70px">
      <button v-for="variant in round.variants" class="rounded-8px bg-white text-black px-10px py-5px border-black capitalize font-size-20px font-700" @click="handleAnswerClick(variant)">
        {{ variant.translation }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
