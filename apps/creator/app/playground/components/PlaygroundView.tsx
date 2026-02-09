'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Dices, Gamepad, Gamepad2, Puzzle, RefreshCcw, Sparkles, Star, Trophy } from 'lucide-react';
import { useState } from 'react';
import { SukunaBackground } from './SukunaBackground';

// --- Tic Tac Toe Logic ---
type Player = 'X' | 'O' | null;

export function PlaygroundView() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      desc: 'The classic battle of wits.',
      icon: Gamepad,
      color: 'bg-red-600',
      difficulty: 'Easy'
    },
    {
      id: 'memory',
      name: 'Memory Match',
      desc: 'Test your creator memory.',
      icon: Puzzle,
      color: 'bg-purple-600',
      difficulty: 'Medium',
      comingSoon: true
    },
    {
      id: 'dice',
      name: 'Creator Dice',
      desc: 'Roll for your next content idea.',
      icon: Dices,
      color: 'bg-orange-600',
      difficulty: 'Luck',
      comingSoon: true
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground w-full">
      <SukunaBackground />

      <div className="relative z-10 p-4 md:p-12 max-w-7xl mx-auto space-y-8 md:space-y-12 pb-32">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-[1.25rem] md:rounded-[1.5rem] bg-red-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] border border-red-500/50 rotate-3 shrink-0">
                <Gamepad2 className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="min-w-0">
                <h1 className="text-3xl md:text-5xl lg:text-6xl  text-white leading-none flex flex-wrap items-center gap-2 md:gap-3">
                  Playground <span className="text-red-600">God</span>
                </h1>
                <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2 truncate">
                  Ryomen Sukuna&apos;s Entertainment Hall
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between md:justify-start gap-4 md:gap-8 px-5 md:px-8 py-4 md:py-5 bg-white/5 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl"
          >
            <div className="text-left md:text-center group cursor-default">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-red-500 transition-colors">
                Daily Highscore
              </p>
              <p className="text-xl md:text-3xl font-black italic text-white tracking-widest leading-none mt-1">2,450</p>
            </div>
            <div className="w-px h-8 md:h-10 bg-white/10" />
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30 shrink-0">
              <Trophy className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  id: 'tictactoe',
                  name: 'Malevolent Shrine',
                  desc: 'A strategic battle of X and O within the domain.',
                  icon: Gamepad,
                  color: 'from-red-600 to-red-900',
                  difficulty: 'Cursed Level: Easy'
                },
                {
                  id: 'memory',
                  name: 'Memory Sieve',
                  desc: 'Recall the patterns of the cursed realm.',
                  icon: Puzzle,
                  color: 'from-purple-600 to-purple-900',
                  difficulty: 'Cursed Level: Medium',
                  comingSoon: true
                },
                {
                  id: 'dice',
                  name: 'Dice of Fate',
                  desc: 'Roll to determine your content destiny.',
                  icon: Dices,
                  color: 'from-orange-600 to-orange-900',
                  difficulty: 'Cursed Level: Luck',
                  comingSoon: true
                }
              ].map((game) => (
                <Card
                  key={game.id}
                  onClick={() => !game.comingSoon && setActiveGame(game.id)}
                  className={cn(
                    'group relative border-none bg-white/5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden rounded-[2.5rem] p-0 shadow-2xl ring-1 ring-white/10 hover:ring-red-500/30 active:scale-95',
                    game.comingSoon && 'opacity-60 grayscale cursor-not-allowed'
                  )}
                >
                  <div
                    className={cn(
                      'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br',
                      game.color
                    )}
                  />

                  <div className="relative z-10 p-6 md:p-10 space-y-6 md:space-y-8">
                    <div
                      className={cn(
                        'h-12 w-12 md:h-16 md:w-16 rounded-[1rem] md:rounded-[1.25rem] bg-white/10 flex items-center justify-center shadow-2xl border border-white/10 group-hover:bg-white text-white group-hover:text-black transition-all duration-500 rotate-[-5deg] group-hover:rotate-0'
                      )}
                    >
                      <game.icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl  group-hover:text-white transition-colors">{game.name}</h3>
                      <p className="text-white/40 group-hover:text-white/70 text-xs md:text-sm font-medium leading-relaxed transition-colors">
                        {game.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 italic drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                        {game.difficulty}
                      </span>
                      {game.comingSoon ? (
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Sealed</span>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
                          <Star className="h-5 w-5 fill-current" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="game-room"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex justify-center py-10"
            >
              {activeGame === 'tictactoe' && <TicTacToeGame onExit={() => setActiveGame(null)} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Tic Tac Toe Component ---
function TicTacToeGame({ onExit }: { onExit: () => void }) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw'>(null);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every((sq) => sq !== null) ? 'Draw' : null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const win = calculateWinner(newBoard);
    if (win) setWinner(win as any);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <Card className="w-full max-w-xl border-none bg-black/60 backdrop-blur-3xl p-5 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_rgba(220,38,38,0.2)] relative overflow-hidden border border-white/5">
      <div className="absolute top-0 right-0 p-32 bg-red-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 space-y-6 md:space-y-10">
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            onClick={onExit}
            size="sm"
            className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] italic text-white/40 hover:text-white transition-colors hover:bg-white/5 px-2"
          >
            Abandon
          </Button>
          <div className="text-center group min-w-0">
            <h2 className="text-lg md:text-2xl  text-white group-hover:text-red-600 transition-colors truncate">Malevolent Shrine</h2>
            <div className="h-0.5 w-full bg-red-600/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
          </div>
          <Button
            variant="ghost"
            onClick={reset}
            size="icon"
            className="h-8 w-8 md:h-10 md:w-10 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all shrink-0"
          >
            <RefreshCcw className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-2">
          {winner ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl md:text-4xl  text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)] text-center"
            >
              {winner === 'Draw' ? 'Cursed Tie!' : `Domain Won by ${winner}!`}
            </motion.div>
          ) : (
            <div className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/30 flex items-center gap-3 md:gap-4">
              <span className={cn('transition-all duration-300', isXNext ? 'text-red-500 scale-110 md:scale-125 font-bold' : 'opacity-50')}>
                Player X
              </span>
              <div className="w-6 md:w-8 h-px bg-white/10" />
              <span
                className={cn('transition-all duration-300', !isXNext ? 'text-purple-500 scale-110 md:scale-125 font-bold' : 'opacity-50')}
              >
                Player O
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {board.map((sq, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: sq ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(i)}
              className={cn(
                'aspect-square rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center text-3xl md:text-5xl font-black italic transition-all cursor-pointer border-2 shadow-2xl relative overflow-hidden',
                sq === 'X'
                  ? 'text-red-600 border-red-600/30 bg-red-600/5'
                  : sq === 'O'
                    ? 'text-purple-600 border-purple-600/30 bg-purple-600/5'
                    : 'bg-white/5 border-white/5 hover:border-red-600/20 hover:bg-white/10'
              )}
            >
              {sq && (
                <motion.span initial={{ scale: 0.5, opacity: 0, rotate: -45 }} animate={{ scale: 1, opacity: 1, rotate: 0 }}>
                  {sq}
                </motion.span>
              )}
              {!sq && !winner && <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity bg-red-600" />}
            </motion.div>
          ))}
        </div>

        {winner && (
          <Button
            onClick={reset}
            className="w-full h-12 md:h-16 rounded-[1rem] md:rounded-[1.5rem] bg-red-600 hover:bg-red-700 shadow-[0_0_30px_rgba(220,38,38,0.4)] text-white font-black uppercase italic tracking-[0.1em] md:tracking-[0.2em] gap-3 transition-all hover:translate-y-[-4px] active:translate-y-0 text-sm md:text-base"
          >
            <Sparkles className="h-4 w-4 md:h-5 md:w-5" /> Expand Domain Again
          </Button>
        )}
      </div>
    </Card>
  );
}
