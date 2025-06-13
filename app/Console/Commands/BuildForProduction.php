<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class BuildForProduction extends Command
{
    protected $signature = 'app:build-for-production';
    protected $description = 'Build the application for production deployment';

    public function handle()
    {
        $commands = [
            'composer install --no-dev --optimize-autoloader',
            'php artisan key:generate --force',
            'php artisan config:cache',
            'php artisan route:cache',
            'npm install',
            'npm run build',
            'php artisan cache:clear',
            'php artisan view:clear',
           ' php artisan optimize:clear',
            'php artisan migrate --force',
            'composer dump-autoload -o',
        ];

        foreach ($commands as $command) {
            $this->info("Running: $command");
            $process = Process::fromShellCommandline($command);
            if (DIRECTORY_SEPARATOR !== '\\') {
                $process->setTty(true);
            }
            $process->run(function ($type, $buffer) {
                $this->output->write($buffer);
            });

            if (!$process->isSuccessful()) {
                $this->error("Failed: $command");
                return 1;
            }
        }

        $this->info('Application built successfully for production!');
    }
}
