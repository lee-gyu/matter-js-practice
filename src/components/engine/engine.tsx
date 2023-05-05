import { memo, useEffect, useRef } from "react"
import { Engine, Render, Bodies, Composite, Runner } from "matter-js"

const engine = Engine.create();

const BORDER_SIZE = 1;

export const MatterCanvas = memo(() => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (!divRef.current) return;

    const divWidth = divRef.current.clientWidth;
    const divHeight = divRef.current.clientHeight;

    const render = Render.create({
      element: divRef.current,
      engine: engine,
      options: {
        width: divWidth,
        height: divHeight,
      }
    });

    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const ground = Bodies.rectangle(0, divHeight - 60, divWidth, 60, { isStatic: true });

    Composite.add(engine.world, [boxA, ground]);

    Render.run(render);

    const runner = Runner.create();

    Runner.run(runner, engine);

    return () => { 
      // destroy the render
      Render.stop(render);
      // cancel the runner
      Runner.stop(runner);

      render.canvas.remove();
    }

  }, [])

  return <div ref={divRef} className="h-[800px] border border-gray-600"></div>
})